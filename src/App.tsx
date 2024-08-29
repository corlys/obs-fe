import { useUserContext } from "@/hooks/useUserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function App() {
  const { users, deleteUser } = useUserContext();
  return (
    <>
      <div className="min-h-screen font-poppins">
        <nav className="max-w-5xl mx-auto px-10 lg:px-0 flex items-center justify-between my-10">
          <h3>App</h3>
          <h3>Linkedin</h3>
        </nav>
        <div className="container max-w-4xl mx-auto flex flex-col items-center mb-10">
          <div className="flex flex-col gap-6 w-full">
            {users.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex flex-row gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://picsum.photos/200"
                        alt="@corlys"
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap 2">
                      <h2 className="text-lg">{item.name}</h2>
                      <h3 className="text-sm">@{item.username}</h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row justify-end items-center gap-4">
                    <Button
                      onClick={() => deleteUser(item.id)}
                      variant={"destructive"}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
