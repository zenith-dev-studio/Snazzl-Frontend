import { Menu, Search, Bell, User } from "lucide-react";

export function AdminNav()
{
    return <header className="flex justify-between items-center mb-6 bg-white p-4 w-full">
          <input type="text" placeholder="Search orders, stores, customers..." className="border border-[#E5E7EB] rounded-lg px-4 py-2 w-1/2" />
          <div className="flex items-center gap-3">
            <svg className="cursor-pointer" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_54_47)">
<g clip-path="url(#clip1_54_47)">
<path d="M7.00001 0.5C6.44689 0.5 6.00001 0.946875 6.00001 1.5V2.1C3.71876 2.5625 2.00001 4.58125 2.00001 7V7.5875C2.00001 9.05625 1.45939 10.475 0.484387 11.575L0.253137 11.8344C-0.00936282 12.1281 -0.0718628 12.55 0.0875122 12.9094C0.246887 13.2688 0.606262 13.5 1.00001 13.5H13C13.3938 13.5 13.75 13.2688 13.9125 12.9094C14.075 12.55 14.0094 12.1281 13.7469 11.8344L13.5156 11.575C12.5406 10.475 12 9.05937 12 7.5875V7C12 4.58125 10.2813 2.5625 8.00001 2.1V1.5C8.00001 0.946875 7.55314 0.5 7.00001 0.5ZM8.41564 15.9156C8.79064 15.5406 9.00001 15.0312 9.00001 14.5H7.00001H5.00001C5.00001 15.0312 5.20939 15.5406 5.58439 15.9156C5.95939 16.2906 6.46876 16.5 7.00001 16.5C7.53126 16.5 8.04064 16.2906 8.41564 15.9156Z" fill="#4B5563"/>
</g>
</g>
<defs>
<clipPath id="clip0_54_47">
<rect width="14" height="16" fill="white" transform="translate(0 0.5)"/>
</clipPath>
<clipPath id="clip1_54_47">
<path d="M0 0.5H14V16.5H0V0.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

          <User className="cursor-pointer"/>

            <span className="font-semibold">John Admin</span>
          </div>
        </header>
}