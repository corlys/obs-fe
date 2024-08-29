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
import { ReactNode, useState, FC } from "react";

type ModalButtonProps = {
  children: ReactNode;
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  className?: string;
};

const ModalButton: FC<ModalButtonProps> = ({
  children,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  className,
}: ModalButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={cn(className)}>
        <Dialog open={open} onOpenChange={setOpen}>
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
