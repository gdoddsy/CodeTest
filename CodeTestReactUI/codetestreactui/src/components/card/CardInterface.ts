export interface HeaderInterface {
    title: string
}

export interface BodyInterface {
    children?: React.ReactNode
}

export interface FooterInterface {
    style?: object,
    value?: number | string,
    children?: React.ReactNode
}

export interface CTAInterface {
    action?: React.ReactNode
}

export interface CardInterface {
    style?: object,
    children: React.ReactNode
}

export interface FizzBuzzNumber {
	payload: {
		value: number
	},
	response: {
		data: string
	}
}

export interface CreateFizzBuzzResultsList {
	payload: {
		start: number,
		count: number
	},
	response: {
		data: any
 	}
}

export interface UserInput {
	number: number,
	result: string
}

export interface VerifyFizzBuzzResults {
	payload: UserInput[],
	userInput: UserInput,
	response: {
		data: any
	}
}