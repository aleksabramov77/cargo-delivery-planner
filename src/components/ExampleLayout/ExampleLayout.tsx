import React, { DetailedHTMLProps, FC, HTMLAttributes, SyntheticEvent, useState } from 'react';
import { Resizable, ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './example.css';

interface CustomResizeHandleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handleAxis?: string;
}

const CustomResizeHandle = React.forwardRef<HTMLDivElement, CustomResizeHandleProps>((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <div
      className={`custom-handle custom-handle-${handleAxis} custom-resize-handle-component`}
      ref={ref}
      {...restProps}
    ></div>
  );
});

export const ExampleLayout: FC = () => {
  const [state, setState] = useState({
    width: 200,
    height: 200,
    absoluteWidth: 200,
    absoluteHeight: 200,
    absoluteLeft: 0,
    absoluteTop: 0,
  });

  const onResetClick = () => {
    setState((p) => ({ ...p, width: 200, height: 200, absoluteWidth: 200, absoluteHeight: 200 }));
  };

  // On top layout
  const onFirstBoxResize = (event: SyntheticEvent<Element, Event>, { size, handle }: ResizeCallbackData) => {
    setState((p) => ({ ...p, width: size.width, height: size.height }));
  };

  // On bottom layout. Used to resize the center element around its flex parent.
  const onResizeAbsolute = (event: SyntheticEvent<Element, Event>, { size, handle }: ResizeCallbackData) => {
    setState((p) => {
      let newLeft = p.absoluteLeft;
      let newTop = p.absoluteTop;
      const deltaHeight = size.height - p.absoluteHeight;
      const deltaWidth = size.width - p.absoluteWidth;
      if (handle[0] === 'n') {
        newTop -= deltaHeight;
      } else if (handle[0] === 's') {
        newTop += deltaHeight;
      }
      if (handle[handle.length - 1] === 'w') {
        newLeft -= deltaWidth;
      } else if (handle[handle.length - 1] === 'e') {
        newLeft += deltaWidth;
      }

      return {
        ...p,
        absoluteWidth: size.width,
        absoluteHeight: size.height,
        absoluteLeft: newLeft,
        absoluteTop: newTop,
      };
    });
  };

  return (
    <div>
      <h3>Statically Positioned Layout</h3>
      <div className="layoutRoot">
        <Resizable
          className="box"
          height={state.height}
          width={state.width}
          onResize={onFirstBoxResize}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <div style={{ width: state.width + 'px', height: state.height + 'px' }}>
            <span className="text">{'Raw use of <Resizable> element. 200x200, all Resize Handles.'}</span>
            <button onClick={onResetClick} style={{ marginTop: '10px' }}>
              Reset element's width/height
            </button>
          </div>
        </Resizable>
        <ResizableBox className="box" width={200} height={200}>
          <span className="text">{'<ResizableBox>'}</span>
        </ResizableBox>
        <ResizableBox
          className="custom-box box"
          width={200}
          height={200}
          handle={<span className="custom-handle custom-handle-se" />}
          handleSize={[8, 8]}
        >
          <span className="text">{'<ResizableBox> with custom overflow style & handle in SE corner.'}</span>
        </ResizableBox>
        <ResizableBox
          className="custom-box box"
          width={200}
          height={200}
          handle={<CustomResizeHandle />}
          handleSize={[8, 8]}
        >
          <span className="text">{'<ResizableBox> with a custom resize handle component.'}</span>
        </ResizableBox>
        <ResizableBox
          className="custom-box box"
          width={200}
          height={200}
          handle={(h, ref) => <span className={`custom-handle custom-handle-${h}`} ref={ref} />}
          handleSize={[8, 8]}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">{'<ResizableBox> with custom handles in all locations.'}</span>
        </ResizableBox>
        <ResizableBox className="box" width={200} height={200} draggableOpts={{ grid: [25, 25] }}>
          <span className="text">Resizable box that snaps to even intervals of 25px.</span>
        </ResizableBox>
        <ResizableBox className="box" width={200} height={200} minConstraints={[150, 150]} maxConstraints={[500, 300]}>
          <span className="text">Resizable box, starting at 200x200. Min size is 150x150, max is 500x300.</span>
        </ResizableBox>
        <ResizableBox
          className="box hover-handles"
          width={200}
          height={200}
          minConstraints={[150, 150]}
          maxConstraints={[500, 300]}
        >
          <span className="text">Resizable box with a handle that only appears on hover.</span>
        </ResizableBox>
        <ResizableBox
          className="box"
          width={200}
          height={200}
          lockAspectRatio={true}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">Resizable square with a locked aspect ratio.</span>
        </ResizableBox>
        <ResizableBox
          className="box"
          width={200}
          height={120}
          lockAspectRatio={true}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">Resizable rectangle with a locked aspect ratio.</span>
        </ResizableBox>
        <ResizableBox className="box" width={200} height={200} axis="x">
          <span className="text">Only resizable by "x" axis.</span>
        </ResizableBox>
        <ResizableBox className="box" width={200} height={200} axis="y">
          <span className="text">Only resizable by "y" axis.</span>
        </ResizableBox>
        <ResizableBox className="box" width={200} height={200} axis="both">
          <span className="text">Resizable ("both" axis).</span>
        </ResizableBox>
        <ResizableBox className="box" width={200} height={200}>
          <span className="text">Not resizable ("none" axis).</span>
        </ResizableBox>
      </div>

      <h3>Absolutely Positioned Layout</h3>
      <div className="layoutRoot absoluteLayout">
        <ResizableBox
          className="box absolutely-positioned top-aligned left-aligned"
          height={200}
          width={200}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">Top-left Aligned</span>
        </ResizableBox>
        <ResizableBox
          className="box absolutely-positioned bottom-aligned left-aligned"
          height={200}
          width={200}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">Bottom-left Aligned</span>
        </ResizableBox>
        {/* See implementation of `onResizeAbsolute` for how can be moved around its container */}
        <Resizable
          className="box absolutely-positioned"
          height={state.absoluteHeight}
          width={state.absoluteWidth}
          onResize={onResizeAbsolute}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <div
            style={{
              width: state.absoluteWidth,
              height: state.absoluteHeight,
              margin: `${state.absoluteTop} 0 0 ${state.absoluteLeft}`,
            }}
          >
            <span className="text">
              {'Raw use of <Resizable> element with controlled position. Resize and reposition in all directions.'}
            </span>
          </div>
        </Resizable>
        <ResizableBox
          className="box absolutely-positioned top-aligned right-aligned"
          height={200}
          width={200}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">Top-right Aligned</span>
        </ResizableBox>
        <ResizableBox
          className="box absolutely-positioned bottom-aligned right-aligned"
          height={200}
          width={200}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">Bottom-right Aligned</span>
        </ResizableBox>
      </div>

      <h3>Scaled Absolute Layout</h3>
      <div>
        <small>
          If you are nesting Resizables in an element with <code>transform: scale(n)</code>, be sure to pass the same{' '}
          <code>n</code>&nbsp; as the <code>transformScale</code> property.
          <br />
          box has scale 0.75.
        </small>
      </div>
      <div className="layoutRoot absoluteLayout scaledLayout">
        <ResizableBox
          className="box absolutely-positioned top-aligned left-aligned"
          width={200}
          height={200}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">{'<ResizableBox> with incorrect scale 1'}</span>
        </ResizableBox>

        <ResizableBox
          className="box absolutely-positioned bottom-aligned left-aligned"
          width={200}
          height={200}
          transformScale={0.75}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">{'<ResizableBox> with correct scale 0.75'}</span>
        </ResizableBox>

        {/* See implementation of `onResizeAbsolute` for how can be moved around its container */}
        <Resizable
          className="box absolutely-positioned"
          height={state.absoluteHeight}
          width={state.absoluteWidth}
          onResize={onResizeAbsolute}
          transformScale={0.75}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <div
            style={{
              width: state.absoluteWidth,
              height: state.absoluteHeight,
              margin: `${state.absoluteTop} 0 0 ${state.absoluteLeft}`,
            }}
          >
            <span className="text">
              {'Raw use of <Resizable> element with controlled position. Resize and reposition in all directions.'}
            </span>
          </div>
        </Resizable>

        <ResizableBox
          className="box absolutely-positioned top-aligned right-aligned"
          width={200}
          height={200}
          transformScale={0.75}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">{'<ResizableBox> with correct scale 0.75'}</span>
        </ResizableBox>

        <ResizableBox
          className="box absolutely-positioned bottom-aligned right-aligned"
          width={200}
          height={200}
          transformScale={0.75}
          resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        >
          <span className="text">{'<ResizableBox> with correct scale 0.75'}</span>
        </ResizableBox>
      </div>
    </div>
  );
};
