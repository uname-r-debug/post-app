type LayoutProps = React.ComponentProps<"div"> & { children: React.ReactNode };
export default function FlexLayout(layoutProps: LayoutProps): React.JSX.Element {
    return <div className={'flex ' + layoutProps.className}>{layoutProps.children}</div>
};