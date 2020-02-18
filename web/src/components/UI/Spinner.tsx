import React from 'react'

interface Props {
  className?: string
  duration?: number
  color?: string
  height?: number
  width?: number
}

export const Spinner = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { className, width, height, color = 'currentColor', duration = 1500 } = props

  return (
    <svg ref={ref} viewBox="0 0 100 100" className={className} width={width} height={height}>
      <g fill="none" stroke={color} strokeWidth="1">
        <circle cx="50" cy="50" r="1">
          <animate
            fill="remove"
            restart="always"
            additive="replace"
            accumulate="none"
            repeatCount="indefinite"
            keySplines="0.165, 0.84, 0.44, 1"
            keyTimes="0; 1"
            calcMode="spline"
            values="1; 10"
            dur={`${duration}ms`}
            begin="0s"
            attributeName="r"
          ></animate>
          <animate
            fill="remove"
            restart="always"
            additive="replace"
            accumulate="none"
            repeatCount="indefinite"
            keySplines="0.3, 0.61, 0.355, 1"
            keyTimes="0; 1"
            calcMode="spline"
            values="1; 0"
            dur={`${duration}ms`}
            begin="0s"
            attributeName="stroke-opacity"
          ></animate>
        </circle>
        <circle cx="50" cy="50" r="1">
          <animate
            fill="remove"
            restart="always"
            additive="replace"
            accumulate="none"
            repeatCount="indefinite"
            keySplines="0.165, 0.84, 0.44, 1"
            keyTimes="0; 1"
            calcMode="spline"
            values="1; 10"
            dur={`${duration}ms`}
            begin={`-${duration / 2}ms`}
            attributeName="r"
          ></animate>
          <animate
            fill="remove"
            restart="always"
            additive="replace"
            accumulate="none"
            repeatCount="indefinite"
            keySplines="0.3, 0.61, 0.355, 1"
            keyTimes="0; 1"
            calcMode="spline"
            values="1; 0"
            dur={`${duration}ms`}
            begin={`-${duration / 2}ms`}
            attributeName="stroke-opacity"
          ></animate>
        </circle>
      </g>
    </svg>
  )
})
