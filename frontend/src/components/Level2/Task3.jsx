import React, { useState } from "react";

const Task3 = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [encryptedText, setEncryptedText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const sendFileToBackend = async (url, setResult) => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const text = await response.text();
            setResult(text);
        } catch (error) {
            console.error("Error:", error);
            setResult("Error processing file.");
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto mt-10 border border-gray-700">
            <h2 className="text-2xl font-bold mb-2 text-blue-400 text-center">🔐 AES-256 File Encryptor/Decryptor</h2>

            <div className="mb-4 p-3 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300">
                <p>
                    This task allows you to securely encrypt and decrypt text files using the
                    AES-256 encryption algorithm. Upload a `.txt` file and choose to either encrypt
                    or decrypt its contents. AES-256 ensures high-grade security suitable for modern
                    applications.
                </p>
            </div>

            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="w-full mb-4 bg-gray-800 p-2 rounded"
            />

            <div className="flex justify-between gap-4">
                <button
                    onClick={() => sendFileToBackend("http://localhost:8080/file-security/encrypt", setEncryptedText)}
                    className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded w-1/2"
                >
                    Encrypt
                </button>
                <button
                    onClick={() => sendFileToBackend("http://localhost:8080/file-security/decrypt", setDecryptedText)}
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded w-1/2"
                >
                    Decrypt
                </button>
            </div>

            {encryptedText && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-yellow-400 border border-yellow-400 rounded ">🔐 Encrypted Text:</h3>
                    <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto">{encryptedText}</pre>
                </div>
            )}

            {decryptedText && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold border border-green-600 rounded text-green-600 ">✅ Decrypted Text:</h3>
                    <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto ">{decryptedText}</pre>
                </div>
            )}
        </div>
    );
};

export default Task3;
