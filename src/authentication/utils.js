export const mockedDecoded = {
	iss: 'https://securetoken.google.com/ddone-dev',
	name: 'Robert Sreberski',
	picture:
		'https://lh3.googleusercontent.com/-II04zkrvOZo/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7rLJcjOrQ772ASbe0DtzHbhYqYePA/mo/photo.jpg',
	aud: 'ddone-dev',
	auth_time: 1532514686,
	user_id: 'j8CUXIkJGaZDjG62XYkDSwIaJIF2',
	sub: 'j8CUXIkJGaZDjG62XYkDSwIaJIF2',
	iat: 1533648292,
	exp: 1533651892,
	email: 'robertsreberski@gmail.com',
	email_verified: true,
	uid: 'j8CUXIkJGaZDjG62XYkDSwIaJIF2',
}

export const isBearer = authorizationHeader =>
	authorizationHeader.split(' ')[0] === 'Bearer'
