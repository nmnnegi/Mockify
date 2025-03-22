import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { userId } = useAuth();
  
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    setError(false);
    
    try {
      // Using a simpler query to get all interviews, ordered by creation date
      // and limited to 10 for performance
      const interviewQuery = query(
        collection(db, "interviews"),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      console.log("Setting up Firebase listener for interviews collection");
      
      const unsubscribe = onSnapshot(
        interviewQuery,
        (snapshot) => {
          console.log(`Got ${snapshot.docs.length} documents from Firestore`);
          
          const interviewList: Interview[] = snapshot.docs.map((doc) => {
            const id = doc.id;
            const data = doc.data();
            console.log(`Document data for ${id}:`, data);
            
            return {
              id,
              ...data,
            };
          }) as Interview[];
          
          setInterviews(interviewList);
          setLoading(false);
        },
        (error) => {
          console.log("Error on fetching: ", error);
          setError(true);
          toast.error("Unable to load data", {
            description: "There was an error loading your interviews. Please try again.",
          });
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up Firebase listener:", error);
      setError(true);
      setLoading(false);
      toast.error("Connection error", {
        description: "Could not connect to the database. Please try again later.",
      });
      return () => {}; // Return empty function as cleanup
    }
  }, [userId]); // Removed auth.currentUser dependency

  return (
    <>
      <div className="flex w-full items-center justify-between">
        {/* headings */}
        <Headings
          title="Dashboard"
          description="Create and start your AI Mock interview"
        />
        <Link to={"/generate/create"}>
          <Button size={"sm"}>
            <Plus /> Add New
          </Button>
        </Link>
      </div>

      <Separator className="my-8" />
      {/* content section */}

      <div className="md:grid md:grid-cols-3 gap-3 py-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-24 md:h-32 rounded-md" />
          ))
        ) : error ? (
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
            <img
              src="/assets/svg/not-found.svg"
              className="w-44 h-44 object-contain"
              alt=""
            />

            <h2 className="text-lg font-semibold text-muted-foreground">
              Connection Error
            </h2>

            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
              There was an error connecting to the database. Please try again later.
            </p>

            <Button 
              size={"sm"} 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        ) : interviews.length > 0 ? (
          interviews.map((interview) => (
            <InterviewPin key={interview.id} interview={interview} />
          ))
        ) : (
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
            <img
              src="/assets/svg/not-found.svg"
              className="w-44 h-44 object-contain"
              alt=""
            />

            <h2 className="text-lg font-semibold text-muted-foreground">
              No Data Found
            </h2>

            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
              There is no available data to show. Please add some new mock
              interviews
            </p>

            <Link to={"/generate/create"} className="mt-4">
              <Button size={"sm"}>
                <Plus className="min-w-5 min-h-5 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
