interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isLoaned?: boolean;
}

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface BookCoverProps {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverUrl: string;
}

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}

interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

interface CustomJwtSessionClaims {
  metadata: {
    onboardingComplete?: boolean;
  };
}

interface UserPublicMetadata {
  id: string;
  onboardingComplete: boolean;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & {
  success: true;
};
type ErrorResponse = ActionResponse<undefined> & {
  success: false;
};

type InitialData = {
  email: string;
  firstName: string;
  lastName: string;
  universityId: number;
};

type UserState = "non-active" | "active";
