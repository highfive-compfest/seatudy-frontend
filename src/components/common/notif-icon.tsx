import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { MdOutlineNotificationsNone } from "react-icons/md";

export const NotifIcon = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="outline-none">
        <button>
          <MdOutlineNotificationsNone size={28} />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="notif">
          <span>Not Notification yet</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
