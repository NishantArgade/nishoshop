class ErrorHandler extends Error{

	constructor(message,statusCode){
		super(message);
		this.statusCode = statusCode;

		//capture uneccessary info of error and store into stack property.and show only usful info.
		Error.captureStackTrace(this,this.constructor);

	}
}


module.exports = ErrorHandler