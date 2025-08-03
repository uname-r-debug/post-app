import FlexLayout from "../layout/flex";
import GridLayout from "../layout/grid";

export default function UpdateView(): React.JSX.Element {
    return (
        <GridLayout className="grid-cols-2">
            <FlexLayout><></></FlexLayout>
            <FlexLayout><></></FlexLayout>
        </GridLayout>
    );
}