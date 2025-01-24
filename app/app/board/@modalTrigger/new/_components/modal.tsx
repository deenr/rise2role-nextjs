'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ModalProps = {};

function Modal({ props }: { props?: ModalProps }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={(_) => router.back()}>
      <DialogContent>
        <DialogTitle>This is a dialog</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
