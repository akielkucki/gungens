"use client"
import React, {useState} from 'react';
import Toast from "@/src/components/ui/Toast";

const OwnershipNotification = () => {
    const [, setShowContactSection] = useState(false);
    const showContactSection = () => {
        setShowContactSection(!showContactSection);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
       document.getElementById("faq").scrollIntoView({
           behavior: "smooth",
       });

    }
    return (
        <Toast
            message="GunGens is looking for new ownership. Interested? Contact us for details."
            actionLabel="Learn More"
            onActionClick={() => showContactSection()}
            position="bottom-center"
        />
    );
};

export default OwnershipNotification;
