import React, { useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai"; // Importing the X icon
import { getNotifications } from "@/services/notification";
import { getCookie } from "cookies-next";
import { Notification } from "@/types/notification/notification";

export const NotifIcon: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = getCookie("authToken") as string;

  useEffect(() => {
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(token, 1, 10);
        const notificationsData = response.payload.data;
        if (Array.isArray(notificationsData)) {
          setNotifications(notificationsData);
        } else {
          console.error("Unexpected response format:", notificationsData);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const handleMarkAsRead = async (notificationId: string) => {};

  const renderDropdownItems = () => {
    if (loading) {
      return (
        <DropdownItem key="loading" className="text-gray-500">
          Loading...
        </DropdownItem>
      );
    }

    if (error) {
      return (
        <DropdownItem key="error" className="text-red-500">
          {error}
        </DropdownItem>
      );
    }

    if (notifications.length === 0) {
      return (
        <DropdownItem key="no-notifications" className="text-gray-500">
          <span>No Notifications yet</span>
        </DropdownItem>
      );
    }

    return notifications.map((notification) => (
      <DropdownItem key={notification.id} className={`flex flex-col p-3 ${notification.is_read ? "bg-white" : "bg-gray-100"} rounded-md border border-gray-300`}>
        <div className="flex items-start justify-between">
          <div>
            <strong className="text-lg font-semibold">{notification.title}</strong>
            <p className="text-sm text-gray-700">{notification.detail}</p>
            <small className="text-xs text-gray-500">{new Date(notification.created_at).toLocaleString()}</small>
          </div>
          {!notification.is_read && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(notification.id);
              }}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <AiOutlineClose size={16} />
            </button>
          )}
        </div>
      </DropdownItem>
    ));
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="outline-none">
        <button>
          <MdOutlineNotificationsNone size={24} />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Notifications" variant="flat">
        {renderDropdownItems()}
      </DropdownMenu>
    </Dropdown>
  );
};
