import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CreatorIn, PlayerIn } from "@src/components";
import { ProfileContext } from "@src/provider/ProfileProvider";
import { api } from "@src/utils/api";
import { LABELS, Routes } from "@src/utils/constants/constants";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo } from "react";
export default function Page() {
  const createUser = api.auth.create.useMutation();
  const { login } = useContext(ProfileContext);
  const { push } = useRouter();
  const { buttonState, onConnect, publicKey } = useWalletMultiButton({
    onSelectWallet({ wallets, onSelectWallet }) {
      setModalVisible(true);
      console.log({ wallets, onSelectWallet });
    },
  });
  useEffect(() => {
    if (publicKey) {
      void createUser
        .mutateAsync({
          wallet_address: publicKey.toBase58(),
        })
        .then(res => {
          if (!res.success) {
            // TODO implement an error toast
            return;
          }
          void login(res.user!.wallet_address).then(res => {
            if (res.success) {
              void push(`/dashboard/${Routes.HOME}`);
            }
          });
        });
    }
  }, [publicKey]);
  const content = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    } else if (buttonState === "connecting" || buttonState === "has-wallet") {
      return LABELS[buttonState];
    }
  }, [buttonState, publicKey]);
  const { setVisible: setModalVisible } = useWalletModal();
  const handleSignIn = () => {
    switch (buttonState) {
      case "no-wallet":
        setModalVisible(true);
        break;
      case "has-wallet":
        if (onConnect) {
          onConnect();
        }
        break;
      case "connected":
        // redirect user to dashboard
        break;
    }
  };
  return (
    <div className=" item-center flex flex-row justify-between ">
      <div className=" ml-[70px] box-border flex w-[463px] max-w-full flex-col items-start justify-start px-0 pb-0 pt-[3.75rem]">
        <div className=" flex max-w-full flex-col items-start justify-start gap-[70px] self-stretch">
        <div className="flex justify-start">
     <button className="my-40 mr-8 text-3xl  ">
     Connect Wallet
     </button>
     </div>
          <div className="">
            <img
              className=""
              loading="lazy"
              alt=""
              src="/group-1143@2x.png"
            />
          </div>
        </div>
      </div>

      <section className="flex h-screen w-full flex-col content-center items-center justify-center space-y-24  ">
        <button
          onClick={handleSignIn}
          className="group flex flex-col space-y-3 text-grey-300 transition-colors duration-300 hover:text-secondary-700"
        >
          <div className="rounded-3xl border border-grey-300 p-4 transition-colors duration-300 group-hover:border-secondary-700">
            <PlayerIn />
          </div>
          <span>Player</span>
        </button>
        <button
          onClick={handleSignIn}
          className="group flex flex-col space-y-3 text-grey-300 transition-colors duration-300 hover:text-secondary-700"
        >
          <div className="rounded-3xl border border-grey-300 p-4 transition-colors  duration-300 group-hover:border-secondary-700">
            <CreatorIn />
          </div>
          <span>Creator</span>
        </button>
      </section>
    </div>
  );
}
