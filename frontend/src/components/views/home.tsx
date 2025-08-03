import { KeyRound, Mail, UserStar, Image } from "lucide-react";
import FlexLayout from "../layout/flex";
import GridLayout from "../layout/grid";

const classes: {
    flex: string,
    grid: string,
    text: string
} = {
    flex: "justify-center items-center bg-card rounded-xl md:my-10",
    grid: "lg:grid-cols-[auto_1fr] justify-items-center items-center gap-2",
    text: "text-center"
};

export default function HomeView(): React.JSX.Element {
    return (
        <GridLayout className="md:grid-cols-2 gap-10 p-10">

            <FlexLayout className={classes.flex}>
                <Image className="md:size-[500px] size-[125px] animate-pulse" />
            </FlexLayout>

            <FlexLayout className={classes.flex}>

                <FlexLayout className="flex-col">
                    <GridLayout className={classes.grid}>
                        <UserStar />
                        <div className={"classes.text"}>{window.localStorage.name!}</div>
                    </GridLayout>

                    <GridLayout className={classes.grid}>
                        <Mail />
                        <div className={"classes.text"}>{window.localStorage.email!}</div>
                    </GridLayout>

                    <GridLayout className={classes.grid}>
                        <KeyRound />
                        <div className={classes.text + " text-xs"}>{window.localStorage.sessionKey!}</div>
                    </GridLayout>
                </FlexLayout>
            </FlexLayout>

        </GridLayout >
    );
}