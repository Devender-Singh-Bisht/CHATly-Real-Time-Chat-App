

function HappySvg({
    className,
    background = "#FEEE91",
    ...props
}) {
    return (
        <svg
            viewBox="0 0 200 200"
            className={className}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect width="200" height="200" fill={background} />

            <g transform="matrix(1.5625 0 0 1.5625 37.5 110.94)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 1c0 44 72 44 72 0-24.3 8.87-48.3 9.13-72 0Z"
                    fill="#fff"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 21c14.35 15.8 43.35 16 58 .58A140.44 140.44 0 0 1 11 21Z"
                    fill="#DDDBDB"
                />
                <path
                    d="M40.04 35a40.08 40.08 0 0 1-25.36-8.46C7.08 20.37 3 11.54 3 1.07A1.07 1.07 0 0 1 3.45.2a1.08 1.08 0 0 1 .97-.12c22.91 8.8 46.85 8.8 71.12 0a1.05 1.05 0 0 1 1.46.99c0 10.47-4.02 19.3-11.68 25.47a40.14 40.14 0 0 1-25.28 8.45ZM5.18 2.58c.81 20.8 18.44 30.31 34.86 30.31 16.41 0 34.11-9.5 34.86-30.35-23.78 8.3-47.22 8.32-69.72.03Z"
                    fill="#000"
                />
                <path
                    d="M25 36c4.5 5.16 25.03 5.5 30 0a68.29 68.29 0 0 1-30 0Z"
                    fill="#000"
                    opacity=".4"
                    style={{ mixBlendMode: "soft-light" }}
                />
            </g>

            <g transform="matrix(1.5625 0 0 1.5625 31.25 59.38)">
                <path
                    d="M78.36 25.92h-6.6c-9.72 0-9.72.07-9.72-9.73v-3.3A13.04 13.04 0 0 1 75.06-.13 13.04 13.04 0 0 1 88.1 12.9v3.38c-.03 9.72-.03 9.65-9.73 9.65Z"
                    fill="#000"
                />
                <path
                    d="M70.69 9.52a2.28 2.28 0 1 0 0-4.57 2.28 2.28 0 0 0 0 4.57Z"
                    fill="#fff"
                />
                <path
                    d="M74.92 18.31a5.31 5.31 0 1 0 0-10.62 5.31 5.31 0 0 0 0 10.62Z"
                    fill="#fff"
                    opacity=".1"
                />

                <path
                    d="M17.36 25.92h-6.6c-9.72 0-9.72.07-9.72-9.73v-3.3A13.04 13.04 0 0 1 14.06-.13 13.04 13.04 0 0 1 27.1 12.9v3.38c-.03 9.72-.03 9.65-9.73 9.65Z"
                    fill="#000"
                />
                <path
                    d="M9.8 9.53a2.29 2.29 0 1 0 0-4.57 2.29 2.29 0 0 0 0 4.57Z"
                    fill="#fff"
                />
                <path
                    d="M14.03 18.35a5.32 5.32 0 1 0 0-10.65 5.32 5.32 0 0 0 0 10.65Z"
                    fill="#fff"
                    opacity=".1"
                />
            </g>
        </svg>
    );
}

export default HappySvg;