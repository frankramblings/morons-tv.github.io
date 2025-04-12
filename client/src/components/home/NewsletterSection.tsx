import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Check, Tv, Calendar, Bell } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/subscribe", {
        email: values.email,
      });
      
      toast({
        title: "Successfully Subscribed!",
        description: "You've joined our exclusive newsletter community!",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Features list for the newsletter
  const features = [
    { icon: <Calendar className="h-4 w-4" />, text: "Weekly programming updates" },
    { icon: <Bell className="h-4 w-4" />, text: "Breaking news alerts" },
    { icon: <Tv className="h-4 w-4" />, text: "Exclusive behind-the-scenes content" }
  ];

  return (
    <section className="bg-gradient-to-r from-[#0A1B31] to-[#1C304A] py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left column - Newsletter benefits */}
            <div className="md:w-1/2">
              <div className="flex items-center mb-6">
                <div className="bg-[#FF0000] p-2 rounded-full mr-3">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Stay Connected</h2>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">Never miss a moment of moronic brilliance</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter and be the first to know about new shows, exclusive content, 
                and special events from your favorite network for people who struggle with basic reasoning.
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-[#FF4B00]/20 p-1 rounded-full mr-3">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#0A1B31] p-4 rounded border border-gray-700 text-sm">
                <p className="text-gray-300 italic">
                  "I've learned more from this newsletter than from my four years in college. 
                  Mostly about what not to believe."
                </p>
                <p className="text-right mt-2 text-gray-400">— A satisfied viewer</p>
              </div>
            </div>
            
            {/* Right column - Subscription form */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg p-6 text-gray-900 shadow-lg">
                <h4 className="text-xl font-bold text-[#1C304A] mb-2">Sign up for our newsletter</h4>
                <p className="text-gray-600 mb-6">Join thousands of viewers with questionable judgment!</p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Your email address" 
                                {...field} 
                                className="pl-10 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-[#FF4B00] focus:border-[#FF4B00]"
                              />
                              <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold py-3 rounded-md"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      You'll receive weekly updates about our latest programming and special features.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      We promise not to share your information with anyone who might try to educate you properly.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                  By subscribing, you agree to our absurd Terms of Service and acknowledge that your critical thinking skills will be tested.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
