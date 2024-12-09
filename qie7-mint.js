import { ethers } from 'ethers';
import { PrivateKeys$18Wallets, PrivateKeys$136Wallets } from '../../util/privateKey.js';
import { RPC_provider,NewPrivatKeys, sleep, formHexData, walletSendtxData } from '../../util/common.js';
import RPC from '../../config/runnerRPC-1.json' assert { type: 'json' };;
import pLimit from 'p-limit';

const CONCURRENCY_LIMIT=5;

//claimMOCKToken函数
async function claimMOCKToken(wallet){
    const Interacted_contract_Token='0xA13Ae7D8d5bc3BA975507A53890618E2835EFBca';
    const address=wallet.address;
    // let value=Math.round(Math.random()*100)/2000;

    // if (value<0.01) {
    //     value=0.02;
    // } 
    // console.log(`交互数量是：${value}`);
    let numberValue = 0.001; 
    let fixedString = numberValue.toFixed(3); 
    let value1=ethers.parseEther(fixedString);
    // let value1=ethers.parseEther(0.0000001);
    let txData = {
        to: Interacted_contract_Token, 
        data: `0x731133e90000000000000000000000003c4c67317815302fbed7f82baa9c0bab8d7d38090000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000${address.substring(2)}`,
        value: value1
    };
    await walletSendtxData(wallet,txData);
}

const main=async(privateKeys)=>{
    console.log(`当前时间是：${new Date()}`);
    
    for (let index = 0; index < privateKeys.length; index++) {
        const element = privateKeys[index];
        let morphl2_wallet=new ethers.Wallet(element,await RPC_provider(RPC.Abstract));
        console.log(`第${index+1}地址：${morphl2_wallet.address}`);
        await claimMOCKToken(morphl2_wallet);  
        await sleep(3);     
    }
    // const limit = pLimit(CONCURRENCY_LIMIT);
    // const tasks=privateKeys.map(privateKey=>
    //     limit(async ()=>{
    //         let morphl2_wallet=new ethers.Wallet(privateKey,await RPC_provider(RPC.Abstract));
    //         console.log(`地址：${morphl2_wallet.address}`);
    //         // console.log(`第${index+1}个钱包，地址：${Plume_wallet.address}`);
    //         await claimMOCKToken(morphl2_wallet);  
    //         await sleep(3);
    //     })
    //  );
    //  await Promise.allSettled(tasks)
    //  .then(()=>
    //      console.log(`任务已完成`)
    //  )
    //  .catch(error=>{
    //      console.error(error.message);
    //  });
}

main(PrivateKeys$18Wallets.slice(0)).catch(error=>{
    console.error(error.message);  
})