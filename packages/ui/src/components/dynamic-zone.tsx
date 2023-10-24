interface DynamicZoneProps {
  children: {
    __component: string;
    id: number;
  }[];
  components: Record<
    string,
    (props: any) => JSX.Element | Promise<JSX.Element> | null
  >;
}

export const DynamicZone = ({ children, components }: DynamicZoneProps) => {
  return Array.isArray(children)
    ? children.map(({ __component: component, id, ...props }) => {
        if (!(component in components)) {
          return null;
        }

        const Component = components[component] as unknown as (
          props: any
        ) => JSX.Element;

        return <Component key={id} {...props} />;
      })
    : null;
};
