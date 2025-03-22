import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles, Trash2 } from "lucide-react";
import { db } from "@/config/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");

  // Format date safely - handle both Firebase Timestamp and string date formats
  const formatDate = () => {
    try {
      // For mock data with ISO string dates
      if (typeof interview?.createdAt === 'string') {
        const date = new Date(interview.createdAt);
        return `${date.toLocaleDateString("en-US", { dateStyle: "long" })} - ${date.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
      }
      
      // For Firebase Timestamp objects
      if (interview?.createdAt && typeof interview.createdAt.toDate === 'function') {
        const date = interview.createdAt.toDate();
        return `${date.toLocaleDateString("en-US", { dateStyle: "long" })} - ${date.toLocaleTimeString("en-US", { timeStyle: "short" })}`;
      }
      
      return "Date unavailable";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date unavailable";
    }
  };

  // Safely handle techStack which might be string or array
  const renderTechStack = () => {
    try {
      if (Array.isArray(interview?.techStack)) {
        return interview.techStack.map((tech, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
          >
            {tech}
          </Badge>
        ));
      } else if (typeof interview?.techStack === 'string') {
        return interview.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
          >
            {word}
          </Badge>
        ));
      }
      return null;
    } catch (error) {
      console.error("Error rendering tech stack:", error);
      return null;
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click events
    setShowDeleteConfirm(true);
  };

  // Delete interview from Firebase
  const handleDelete = async () => {
    if (!interview?.id) return;
    
    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "interviews", interview.id));
      toast.success("Interview deleted", {
        description: "The interview has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Error deleting interview", {
        description: "There was a problem deleting the interview. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Fix event handler types to match expected signature
  const handleActivate = () => {
    setIsActive(true);
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  return (
    <>
      <Card className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-100 cursor-pointer transition-all space-y-4">
        <CardTitle className="text-lg">{interview?.position}</CardTitle>
        <CardDescription>{interview?.description}</CardDescription>
        <div className="w-full flex items-center gap-2 flex-wrap">
          {renderTechStack()}
        </div>

        <CardFooter
          className={cn(
            "w-full flex items-center p-0",
            onMockPage ? "justify-end" : "justify-between"
          )}
        >
          <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
            {formatDate()}
          </p>

          {!onMockPage && (
            <div className="flex items-center justify-center">
              <TooltipButton
                content="View"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/generate/${interview?.id}`, { replace: true });
                }}
                disbaled={isDeleting}
                buttonClassName="hover:text-sky-500"
                icon={<Eye />}
                loading={false}
              />

              <TooltipButton
                content="Feedback"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/generate/feedback/${interview?.id}`, {
                    replace: true,
                  });
                }}
                disbaled={isDeleting}
                buttonClassName="hover:text-yellow-500"
                icon={<Newspaper />}
                loading={false}
              />

              <TooltipButton
                content="Start"
                buttonVariant={"ghost"}
                onClick={() => {
                  navigate(`/generate/interview/${interview?.id}`, {
                    replace: true,
                  });
                }}
                disbaled={isDeleting}
                buttonClassName="hover:text-sky-500"
                icon={<Sparkles />}
                loading={false}
              />

              <TooltipButton
                content="Delete"
                buttonVariant={"ghost"}
                onClick={openDeleteDialog}
                disbaled={isDeleting}
                buttonClassName="hover:text-red-500"
                icon={<Trash2 />}
                loading={isDeleting}
              />
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the interview "{interview?.position}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isActive ? 
        <Input
          type="password"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          className="w-full max-w-[250px] text-center"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDeactivate();
            }
          }}
        />
      : 
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleActivate}
          className="cursor-pointer"
        >
          ●●●●●●●●
        </Button>
      }
    </>
  );
};
