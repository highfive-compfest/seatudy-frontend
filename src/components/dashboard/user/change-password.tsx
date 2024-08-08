import { changePassword } from "@/services/auth";
import { Button } from "@nextui-org/button";
import {  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { getCookie } from "cookies-next";
import React, { useState, ChangeEvent } from "react";
export const ChangePw = () => {

    const accToken = getCookie("authToken") as any;

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [succes, setSucces] = useState<boolean>(false);
    const [info, setInfo] = useState<string>("");
    const [isPending, setPending] = useState<boolean>(false);
    const [data, setData] = useState<any>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const name = event.target.name;
        const value = event.target.value;
        setData((values:any) => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        setPending(true);
        setSucces(true)
        try {
            const res = await changePassword(data, accToken);
            setPending(false);
            setInfo(res.message)
        } catch (error: any) {
            const message = error.response.data.message;
            setInfo(message)
        } finally {
            setPending(false);
        }
        }
    
    return (
        <>
            <Button onPress={onOpen} color="danger" radius="full" className="px-4 text-wrap">Reset Password</Button>
            <Modal backdrop="blur" placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Reset Password</ModalHeader>
                    <ModalBody>
                    {/* <p>Your password has been successfully changed.</p>: */}
                    <input
                        required
                        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block w-full"
                        name="old_password"
                        onChange={handleChange}
                        placeholder="Old Password"
                        type="password"
                        minLength={8}
                    />
                    <input
                        required
                        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-1 w-full"
                        name="new_password"
                        onChange={handleChange}
                        placeholder="New Password"
                        type="password"
                        minLength={8}
                    />
                    <p className="text-center text-red-500 mb-4">{info}</p>
                    </ModalBody>
                    <ModalFooter>
                    {!isPending && <Button radius="full" color="danger" variant="light" onPress={()=>{onClose();setInfo("")}}>
                        Cancel
                    </Button>}
                    {isPending?<Spinner/>:<Button type="submit" radius="full" color="primary">
                        submit
                    </Button>}
                    </ModalFooter>
                </form>
                )}
            </ModalContent>
            </Modal>
        </>
    )
};