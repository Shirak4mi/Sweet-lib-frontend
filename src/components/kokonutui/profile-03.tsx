import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button, Label, Input, Textarea } from "@/components/ui/base";
import { Sparkles, Save, X } from "lucide-react";

interface ProfileFormProps {
  defaultValues?: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
  };
  isLoading?: boolean;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

// Optimized ProfileForm with animations and skeleton loading
export default function ProfileForm({ defaultValues, isLoading = false, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState(defaultValues || {});
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);

  // Simulate form loading effect
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsFormLoaded(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Handle input changes for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  // Skeleton loading component
  const ProfileFormSkeleton = () => (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-6 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xs rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs animate-pulse">
      <div className="flex items-center justify-center gap-6">
        <div className="h-24 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="h-24 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
      <div className="h-4 w-64 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded"></div>

      <div className="grid gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="grid gap-2">
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-4">
        <div className="h-10 w-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
      </div>
    </div>
  );

  // If loading, show skeleton
  if (isLoading) return <ProfileFormSkeleton />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-2xl mx-auto space-y-8 p-6 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xs rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs transition-all duration-500 ${
        isFormLoaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
      }`}
    >
      <div className="flex items-center justify-center gap-6">
        <div
          className="relative group cursor-pointer transition-all duration-300"
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <Avatar
            className={`h-24 w-24 rounded-full border-2 ${
              avatarHover ? "border-zinc-400 dark:border-zinc-500 scale-105" : "border-zinc-200/80 dark:border-zinc-800/80"
            } shadow-xs transition-all duration-300 ease-in-out`}
          >
            <AvatarImage src={defaultValues?.avatar} className="rounded-full object-cover" />
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900">
              {defaultValues?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2) || "SC"}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ${
              avatarHover ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-white text-xs font-medium">Change</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-24 w-24 relative rounded-full border-2 border-dashed border-zinc-200/80 dark:border-zinc-800/80 
            hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50
            transition-all duration-300 overflow-hidden group"
        >
          <Sparkles className="h-6 w-6 text-zinc-600 dark:text-zinc-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
          <span className="absolute inset-0 flex items-center justify-center bg-zinc-200/20 dark:bg-zinc-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Generate
          </span>
        </Button>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 w-full text-center text-sm hover:cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300">
        Upload / Generate a new avatar
      </p>

      <div className="grid gap-6">
        <div className="grid gap-2 transition-all duration-300 hover:-translate-y-0.5">
          <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">
            Display Name
          </Label>
          <Input
            id="name"
            placeholder="Your full name"
            defaultValue={defaultValues?.name}
            onChange={handleChange}
            autoComplete="off"
            className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                       focus:border-zinc-300 dark:focus:border-zinc-700
                       focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       transition-all duration-300"
          />
        </div>

        <div className="grid gap-2 transition-all duration-300 hover:-translate-y-0.5">
          <Label htmlFor="username" className="text-zinc-700 dark:text-zinc-300">
            Username
          </Label>
          <Input
            id="username"
            placeholder="@username"
            defaultValue={defaultValues?.username}
            onChange={handleChange}
            autoComplete="off"
            className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                       focus:border-zinc-300 dark:focus:border-zinc-700
                       focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       transition-all duration-300"
          />
        </div>

        <div className="grid gap-2 transition-all duration-300 hover:-translate-y-0.5">
          <Label htmlFor="bio" className="text-zinc-700 dark:text-zinc-300">
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            className="resize-none bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                       focus:border-zinc-300 dark:focus:border-zinc-700
                       focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                       placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                       transition-all duration-300"
            rows={4}
            defaultValue={defaultValues?.bio}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Social Links</h3>
          <div className="grid gap-4">
            {["website", "twitter", "instagram"].map((social, index) => (
              <div
                key={social}
                className="grid gap-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isFormLoaded ? `fadeInUp 0.5s ${index * 100}ms ease forwards` : "none",
                }}
              >
                <Label htmlFor={social} className="capitalize text-zinc-700 dark:text-zinc-300">
                  {social}
                </Label>
                <Input
                  id={social}
                  placeholder={social === "website" ? "https://your-website.com" : "@username"}
                  defaultValue={defaultValues?.[social as keyof typeof defaultValues]}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-white dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80
                             focus:border-zinc-300 dark:focus:border-zinc-700
                             focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800
                             placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                             transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900/50
                    transition-all duration-300 group"
        >
          <X className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 
                    hover:bg-zinc-800 dark:hover:bg-zinc-200
                    transition-all duration-300 transform hover:scale-105 group"
        >
          <Save className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-y-px" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}
