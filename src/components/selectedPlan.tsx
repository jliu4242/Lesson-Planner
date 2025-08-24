import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export function SelectedPlan( title: String, description: String) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
            <div className='fixed inset=0 flex w-screen items-center justify-center p-4'>
                <DialogPanel className='max-w-lg space-y-4 border bg-white p-12'>
                    <DialogTitle className='font-bold'>{title}</DialogTitle>
                    <Description>{description}</Description>
                    <div className='flex gap-4'>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}