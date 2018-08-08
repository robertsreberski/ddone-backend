import ip from 'ip'

export const getReadableIpAddress = ({isSecure, port}) => {
	return `http${isSecure ? 's' : ''}://${ip.address()}:${port}`
}
