import './panel.scss';

export interface PanelProps {
  children?: React.ReactNode;
  className?: string;
}

export function Panel(props: PanelProps) {
  return (
    <div className={"rat-panel " + props.className}>
      { props.children }
    </div>
  );
}

export default Panel;
