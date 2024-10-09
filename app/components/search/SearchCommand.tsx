import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import Image from "next/image"

  const users = [
    {
        id: 1,
        name: "Avy Freeshore",
        avatar: "/images/img1.jpg",
    },
    {
        id: 2,
        name: "Luna",
        avatar: "/images/img2.jpg",
    },
    {
        id: 3,
        name: "Mia",
        avatar: "/images/img3.jpg",
    }
  ]

  //<CommandEmpty>No results found.</CommandEmpty>
  
  export const SearchCommand = () => {

    const shown = false;

    return (
      <Command className="rounded-lg border shadow-md md:min-w-[300px]">
        <CommandInput placeholder="Search user to message" />
        <CommandList>
          {shown && (
            <CommandGroup heading="Users">
            {users.map((user) => (
                <CommandItem key={user.id}>
                    <Image
                        src={user.avatar}
                        width={40}
                        height={40}
                        alt=""
                        className="rounded-full object-cover size-10"
                    />
                    <span>{user.name}</span>
                </CommandItem>
            ))}
          </CommandGroup>
          )}
        </CommandList>
      </Command>
    )
  }
  