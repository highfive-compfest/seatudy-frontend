"use client"
import React, { useState } from "react";

export const MaterialForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course_id: '',
        attachments: [] as File[],
        attachmentDescriptions: [] as string[],
      });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;

        if (type === 'file' && files) {
            const fileArray = Array.from(files);
            const fileDescriptions = fileArray.map(() => ''); 
            setFormData({
            ...formData,
            attachments: fileArray,
            attachmentDescriptions: fileDescriptions,
            });
        } else {
            setFormData({
            ...formData,
            [name]: value,
            });
        }
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const newDescriptions = [...formData.attachmentDescriptions];
        newDescriptions[index] = value;
        setFormData({
          ...formData,
          attachmentDescriptions: newDescriptions,
        });
      };

    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault()
        console.log(formData)
    }
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
                <h2 className="font-semibold text-xl">Create Material</h2>
                <input
                    name="title"
                    required
                    onChange={handleChange} 
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" 
                    placeholder="Title" 
                    type="text"/>
                <textarea
                    name="description"
                    required
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Description Material" 
                    className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                <h2 className="font-semibold text-xl">Attachment</h2>
                <div className="w-full mt-4 md:mt-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attachment file</label>
                    <input
                        required
                        onChange={handleChange}
                        type="file"
                        name="syllabus"
                        accept=".pdf,.doc,.docx,.bmp"
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    />
                </div>
                {formData.attachments.map((_, index) => (
                <div key={index}>
                    <textarea
                        required
                        value={formData.attachmentDescriptions[index] || ''}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        rows={4} 
                        placeholder="Description Attachment" 
                        className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                </div>
                ))}
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Create Material
                </button>
            </form>
        </div>
    )
};
