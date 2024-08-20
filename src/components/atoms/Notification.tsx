import { type Notification as NotificationType } from "@prisma/client";
import { api } from "@src/utils/api";
import { Routes } from "@src/utils/constants/constants";
import Link from "next/link";
import * as React from "react";
import { TfiReload } from "react-icons/tfi";
import moment from "moment";

import TopNav from "@src/components/TopNav";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface INotificationProps {
  gameId: string;
}

const Notification: React.FC<INotificationProps> = (props) => {
  const { mutateAsync, isLoading } = api.player.get_notifications.useMutation();
  const [notifications, setNotifications] = React.useState<Array<NotificationType>>([]);
  const [noMoreFetch, setNoMoreFetch] = React.useState(false);
  const [firstFetch, setFirstFetch] = React.useState(true);

  const fetchNotification = async (reset?: boolean) => {
    const PAGE_SIZE = 20;
    const newNotifications = (
      await mutateAsync({
        limit: PAGE_SIZE,
        skip: reset ? 0 : notifications.length,
      })
    )?.notifications;
    if (newNotifications.length < PAGE_SIZE) {
      setNoMoreFetch(true);
    }
    setNotifications(prev => (reset ? [] : [...prev]).concat(newNotifications));
    setFirstFetch(false);
  };

  const resetState = async () => {
    setFirstFetch(true);
    setNoMoreFetch(false);
    void fetchNotification(true);
  };

  React.useEffect(() => {
    void resetState();
  }, []);

  let content: React.ReactNode;
  if (firstFetch) {
    content = (
      <div className="my-8 flex flex-col items-center">
        <Spinner />
        <h2>Checking for notifications...</h2>
      </div>
    );
  } else if (notifications.length === 0) {
    content = (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-medium">Nothing in Notification</h2>
        <p className="text-grey-200">
          Created games and ongoing games will be listed here
        </p>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col space-y-5">
        {notifications?.map(notification => (
          <NotificationItem key={notification.id} {...notification} />
        ))}

        {!noMoreFetch && !firstFetch && (
          <Button
            onClick={() => fetchNotification()}
            text="Load more"
            className="mt-12"
          />
        )}
      </div>
    );
  }

  return (
    <main>
      <div className="hidden md:block">
        <TopNav />
      </div>
      <div className="bg-mint-50 py-10 w-full">
        <h1 className="text-center text-3xl font-bold">Notification</h1>
        <TfiReload
          className="h-6 w-auto cursor-pointer mx-auto mt-4"
          onClick={() => {
            setFirstFetch(true);
            void fetchNotification(true);
          }}
        />
      </div>
      <div className="w-full md:w-[550px] mx-auto py-10 shadow px-5 space-y-5 min-h-screen">
        {content}
      </div>
    </main>
  );
};

interface INotificationItemProps extends NotificationType {
  action?: string;
  actionLink?: string;
}

const NotificationItem: React.FC<INotificationItemProps> = (props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 mb-4 md:pb-0 md:mb-0 md:border-none">
      <div className="flex items-center gap-3 mb-2 md:mb-0">
        <div className="w-2 h-2 md:w-4 md:h-4 bg-primary-green rounded-full" />
        <span className="text-lg sm:text-2xl font-medium">{props.message}</span>
      </div>
      <div className="flex flex-col md:items-end">
        <p className="text-gray-500 text-sm">{moment(props.created_at).fromNow()}</p>
        {props.actionLink && (
          <Link href={props.actionLink} className="bg-neutral-200 px-3 py-2 active:scale-90 duration-200 inline-block mt-2 md:mt-0 max-w-fit">
            {props.action || "View"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Notification;