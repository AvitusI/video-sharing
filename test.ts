const findManyResult = [
    {
        id: 1,
        userId: 5,
        users: [
            { id: 5, name: "A" },
            { id: 2, name: "B "} 
        ],
    },
    {
        id: 1,
        userId: 5,
        users: [
            { id: 5, name: "A" },
            { id: 3, name: "C" }
        ],
    },
    {
        id: 1,
        userId: 5,
        users: [
            { id: 5, name: "A" },
            { id: 6, name: "D" }
        ],
    },
    {
        id: 1,
        userId: 5,
        users: [
            { id: 5, name: "A" },
            { id: 7, name: "E" }
        ],
    },
]

// Is supabase good for freelancing

findManyResult.forEach((chat) => {
    if (chat.users.some((user) => user.id === 3)) {
        console.log(chat)
    }
})

