import React, { useState, ReactNode } from "react";
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

interface ModalButtonProps {
  children: (props: { close: () => void }) => ReactNode;
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  className?: string;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  buttonTitle,
  dialogTitle,
  dialogDescription,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

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
            {children({ close: closeDialog })}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ModalButton;
