import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ModalButtonProps = {
  children?: ReactNode;
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  className?: string;
};

const ModalButton = ({
  children,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  className,
}: ModalButtonProps) => {
  return (
    <>
      <div className={cn(className)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button>{buttonTitle}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ModalButton;
