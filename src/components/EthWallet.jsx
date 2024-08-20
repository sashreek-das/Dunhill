/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { useState } from "react"
export const EthWallet = ({mnemonic}) => {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [addresses, setAddresses ] = useState([]);

    return (
        <div>
            <button onClick={async function(){
                const seed = await mnemonicToSeed(mnemonic);
                console.log(seed);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                const hdNode = HDNodeWallet.fromSeed(seed);
                const child = hdNode.derivePath(derivationPath);
                const privateKey = child.privateKey;
                console.log(privateKey);
                const wallet = new Wallet(privateKey);
                setCurrentIndex(currentIndex+1);
                setAddresses([...addresses, wallet.address]);
            }} className="text-white">
                Add ETH wallet 
            </button>
            {addresses.map(p=><div className="text-white">
                Eth - {p}
            </div>)}
        </div>
    )
}