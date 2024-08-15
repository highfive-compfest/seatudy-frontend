import React, { useEffect, useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { getNotifications, markNotificationAsRead } from "@/services/notification";
import { getCookie } from "cookies-next";
import { Notification } from "@/types/notification/notification";

export const NotifIcon: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  const token = getCookie("authToken") as string;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await getNotifications(token, 1, 4);
        const notificationsData = response.payload.data;
        if (Array.isArray(notificationsData)) {
          setNotifications(notificationsData);
        } else {
          setError("Unexpected response format");
        }
      } catch {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 10000);

    return () => clearInterval(intervalId);
  }, [token]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(token, notificationId);
      setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, is_read: true } : notif)));
    } catch {
      setError("Error marking notification as read");
    }
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const unreadCount = notifications.filter((notification) => !notification.is_read).length;

  const filteredNotifications = showAll ? notifications : notifications.filter((notification) => !notification.is_read);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative p-2 focus:outline-none hover:bg-gray-100 rounded-full transition-colors">
        <MdOutlineNotificationsNone size={24} />
        {unreadCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1 translate-x-1/3 -translate-y-1/4">{unreadCount}</span>}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border border-gray-300 rounded-md overflow-hidden transition-transform transform scale-100 duration-300 ease-out">
          {loading && <div className="p-3 text-gray-500">Loading...</div>}

          {error && <div className="p-3 text-red-500">{error}</div>}

          {!loading && !error && notifications.length === 0 && <div className="p-3 text-sm text-gray-500">No notifications yet</div>}

          {!loading && !error && notifications.length > 0 && (
            <>
              {filteredNotifications.length === 0 && <div className="p-3 text-sm text-gray-500">No unread notifications</div>}
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className={`flex flex-col p-3 ${notification.is_read ? "bg-white" : "bg-gray-100"} border border-gray-300 transition-colors duration-300 ease-in-out`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <strong className="text-medium font-semibold">{notification.title}</strong>
                      <p className="text-xs text-gray-700">{notification.detail}</p>
                      <small className="text-xs text-gray-500">{new Date(notification.created_at).toLocaleString()}</small>
                    </div>
                    {!notification.is_read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none transition-colors duration-200 ease-in-out"
                      >
                        <AiOutlineClose size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div onClick={() => setShowAll((prev) => !prev)} className="px-3 py-2 text-xs text-blue-500 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                {showAll ? "Show Unread Only" : "Show All Notifications"}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
