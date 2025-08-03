type LayoutProps = React.ComponentProps<"div"> & { children: React.ReactNode };
export default function GridLayout(layoutProps: LayoutProps): React.JSX.Element {
    return <div className={'grid ' + layoutProps.className}>{layoutProps.children}</div>
};