import { Button } from "@/components/ui/button"
import {
    Card,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Instagram() {
    return (
        <Card className=''>
            <CardTitle className='text-center'>Hack Instagram Account</CardTitle>
            <form className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <div className="flex">
                        <Input
                            type="text"
                            placeholder="Facebook Link"
                            className="grow"
                        />
                        <Input
                            className='w-auto'
                            type="time"
                        />
                    </div>
                </div>
                <Button>
                    Start Instagram Hack
                </Button>
            </form>
        </Card>
    )
}
