"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineAppstore,
  AiOutlineBars,
  AiOutlineContainer,
  AiOutlineFileSearch,
  AiOutlineSetting,
  AiOutlineUser,
  AiTwotoneSetting,
} from "react-icons/ai";
interface SidebarProps {
  locale: string;
}
const Sidebar = ({ locale }: SidebarProps) => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const navItems = [
    // {
    //   href: `/${locale}/dashboard/guest-list`,
    //   label: t("guest_list"),
    //   icon: AiOutlineBars,
    // },
    {
      href: `/${locale}/dashboard/location-settings`,
      label: t("location_setting"),
      icon: AiOutlineSetting,
    },
    {
      href: `/${locale}/dashboard/user-settings`,
      label: t("user_settings"),
      icon: AiOutlineUser,
    },
  ];

  return (
    <aside className="w-32 max-h bg-gray-800 text-white p-4 flex flex-col items-center">
      <nav className="flex-1 flex flex-col items-center space-y-2 mt-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className="flex flex-col items-center p-4 rounded-lg cursor-pointer text-center hover:bg-gray-700 transition-all duration-200"
              aria-label={item.label}
            >
              <item.icon
                size={40}
                className={`mb-2 ${
                  pathname === item.href ||
                  (item.href !== `/${locale}/dashboard` &&
                    pathname.startsWith(item.href))
                    ? "text-red-600"
                    : "text - gray - 300"
                }`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
