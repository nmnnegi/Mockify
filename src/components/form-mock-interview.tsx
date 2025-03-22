import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Interview } from "@/types";

import { CustomBreadCrumb } from "./custom-bread-crumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "@/scripts";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData
    ? initialData.position
    : "Create a new mock interview";

  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  const cleanAiResponse = (responseText: string) => {
    try {
      // Step 1: Trim any surrounding whitespace
      let cleanText = responseText.trim();

      // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
      cleanText = cleanText.replace(/(json|```|`)/g, "");

      // Step 3: Extract a JSON array by capturing text between square brackets
      const jsonArrayMatch = cleanText.match(/\[.*\]/s);
      if (jsonArrayMatch) {
        cleanText = jsonArrayMatch[0];
      } else {
        console.error("No JSON array found in response, trying to parse entire response");
        // Try to parse the entire response as JSON
        cleanText = cleanText;
      }

      // Step 4: Parse the clean JSON text into an array of objects
      try {
        const parsed = JSON.parse(cleanText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        } else {
          throw new Error("Parsed JSON is not an array or is empty");
        }
      } catch (error) {
        console.error("Invalid JSON format:", error);
        // Fallback: return a default set of questions if parsing fails
        return [
          { 
            question: "What is your experience with the technologies mentioned in the job description?", 
            answer: "This is a placeholder answer. The AI couldn't generate proper questions. Please try again."
          }
        ];
      }
    } catch (error) {
      console.error("Error processing AI response:", error);
      // Return a fallback question
      return [
        { 
          question: "Tell me about your experience with this technology stack.", 
          answer: "This is a placeholder answer. The AI couldn't generate proper questions. Please try again."
        }
      ];
    }
  };

  const generateAiResponse = async (data: FormData) => {
    try {
      const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

      // Add a timeout to prevent hanging if the API doesn't respond
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("API request timed out")), 15000);
      });
      
      const result = await Promise.race([
        chatSession.sendMessage(prompt),
        timeoutPromise
      ]);
      
      return cleanAiResponse(result.response.text());
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast.error("AI Error", { 
        description: "Could not generate interview questions. Using default questions instead." 
      });
      
      // Return default questions if AI fails
      return [
        { 
          question: `Tell me about your experience with ${data.techStack}?`, 
          answer: "Describe your projects and expertise with these technologies."
        },
        { 
          question: `How would you implement a project using ${data.techStack}?`, 
          answer: "Explain your technical implementation approach."
        },
        { 
          question: `What challenges have you faced with ${data.techStack}?`, 
          answer: "Describe challenges and your problem-solving approach."
        }
      ];
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Form submitted with data:", data);
      console.log("User ID:", userId);

      if (!userId) {
        console.error("No user ID available from Clerk authentication");
        toast.error("Authentication Error", { 
          description: "Please sign in again before creating an interview." 
        });
        setLoading(false);
        return;
      }

      // Generate default questions to ensure we have content in case AI fails
      const defaultQuestions = [
        { 
          question: `Tell me about your experience with ${data.techStack}?`, 
          answer: "Describe your projects and expertise with these technologies."
        },
        { 
          question: `How would you implement a project using ${data.techStack}?`, 
          answer: "Explain your technical implementation approach."
        },
        { 
          question: `What challenges have you faced with ${data.techStack}?`, 
          answer: "Describe challenges and your problem-solving approach."
        }
      ];

      if (initialData) {
        // update
        if (isValid) {
          try {
            console.log("Generating AI response for update");
            const aiResult = await generateAiResponse(data);
            console.log("AI response generated successfully:", aiResult);

            await updateDoc(doc(db, "interviews", initialData?.id), {
              questions: aiResult,
              ...data,
              updatedAt: serverTimestamp(),
            });
            
            console.log("Document updated successfully");
            toast(toastMessage.title, { description: toastMessage.description });
            navigate("/generate", { replace: true });
          } catch (error) {
            console.error("Error updating document:", error);
            
            try {
              // Try fallback update with default questions
              await updateDoc(doc(db, "interviews", initialData?.id), {
                questions: defaultQuestions,
                ...data,
                updatedAt: serverTimestamp(),
              });
              
              toast("Updated with defaults", { 
                description: "Document was updated with default questions due to an error." 
              });
              navigate("/generate", { replace: true });
            } catch (fbError) {
              console.error("Firebase fallback error:", fbError);
              toast.error("Database Error", { 
                description: "Could not update document. Please check your connection and try again." 
              });
            }
          }
        }
      } else {
        // create a new mock interview
        if (isValid) {
          try {
            console.log("Generating AI response for create");
            const aiResult = await generateAiResponse(data);
            console.log("AI response generated successfully:", aiResult);

            await addDoc(collection(db, "interviews"), {
              ...data,
              userId,
              questions: aiResult,
              createdAt: serverTimestamp(),
            });
            
            console.log("Document created successfully");
            toast(toastMessage.title, { description: toastMessage.description });
            navigate("/generate", { replace: true });
          } catch (error) {
            console.error("Error adding document:", error);
            
            try {
              // Try fallback create with default questions
              await addDoc(collection(db, "interviews"), {
                ...data,
                userId,
                questions: defaultQuestions,
                createdAt: serverTimestamp(),
              });
              
              toast("Created with defaults", { 
                description: "Document was created with default questions due to an error." 
              });
              navigate("/generate", { replace: true });
            } catch (fbError) {
              console.error("Firebase fallback error:", fbError);
              toast.error("Database Error", { 
                description: "Could not create document. Please check your connection and try again." 
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error occurred", {
        description: `Something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />

        {initialData && (
          <Button size={"icon"} variant={"ghost"}>
            <Trash2 className="min-w-4 min-h-4 text-red-500" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      <div className="my-6"></div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md "
        >
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- describle your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || !isValid || loading}
            >
              {loading ? (
                <Loader className="text-gray-50 animate-spin" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
