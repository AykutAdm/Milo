import { useEffect, useState } from "react";
import {
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";
import type { UserNotification } from "../../types/notification";
import { Bell, Check, Trash2 } from "lucide-react";
import api from "../../services/api";

function NotificationPage() {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  const fetchData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      await fetchData();
    } catch (error) {
      console.error("Okundu işaretlenemedi:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      await fetchData();
    } catch (error) {
      console.error("Bildirim silinemedi:", error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-50">Bildirimler</h2>
        <p className="text-zinc-400 text-sm mt-1">
          {notifications.length} bildirim
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((x) => (
          <div
            key={x.userNotificationId}
            className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-zinc-50">{x.title}</h3>
                {!x.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
              <p className="text-zinc-400 text-sm mt-0.5">{x.message}</p>
            </div>

            {/* Butonlar */}
            <div className="flex items-center gap-2 shrink-0">
              {!x.isRead && (
                <button
                  onClick={() => handleMarkAsRead(x.userNotificationId)}
                  title="Okundu işaretle"
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-green-400 hover:bg-zinc-700 transition-colors"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}

              {/* Sil */}
              <button
                onClick={() => handleDelete(x.userNotificationId)}
                title="Sil"
                className="p-2 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <span className="text-zinc-600 text-xs shrink-0">
              {new Date(x.createdAt).toLocaleDateString("tr-TR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPage;
