import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolanaWallet } from "../components/SolanaWallet";
import { EthWallet } from "../components/EthWallet";
import { Appbar } from "../components/NavBar";

export function Mnemonic() {
    const [mnemonic, setMnemonic] = useState("");
    const [userMnemonic, setUserMnemonic] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mnemonic).then(() => {
            alert("Mnemonic copied to clipboard!");
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleUserMnemonicChange = (e) => {
        setUserMnemonic(e.target.value);
    };

    return (
        <div>
            <Appbar />
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex space-x-12">
                    <div className="p-8 max-w-md w-full bg-gray-900 rounded-lg shadow-lg space-y-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <button
                            onClick={async function () {
                                const mn = await generateMnemonic();
                                setMnemonic(mn);
                            }}
                            className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            Generate Seed Phrase
                        </button>
                        {mnemonic && (
                            <>
                                <div className="bg-gray-800 text-gray-300 p-4 rounded-md break-words">
                                    {mnemonic}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                                >
                                    Copy to Clipboard
                                </button>
                                <SolanaWallet mnemonic={mnemonic} />
                                <EthWallet mnemonic={mnemonic} />
                            </>
                        )}
                    </div>

                    <div className="p-8 max-w-md w-full bg-gray-900 rounded-lg shadow-lg space-y-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <textarea
                            value={userMnemonic}
                            onChange={handleUserMnemonicChange}
                            placeholder="Paste your seed phrase here"
                            rows="4"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition duration-300 ease-in-out hover:bg-gray-700"
                        />
                        {userMnemonic && (
                            <>
                                <SolanaWallet mnemonic={userMnemonic} />
                                <EthWallet mnemonic={userMnemonic} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
