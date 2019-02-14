export const req = {
	swagger:{
		operation: 'operationId'
	}
}

export function Response(){
	this.isError = false;
	this.code;
	this.type;
	this.key;
	this.data;
	this.message; 

	this.status = function(code){
		if(code > 300)
			this.isError = true;
		this.code = code;
		return this;
	}
	this.json = function(data) {
		if(!this.isError){
			this.data = data;
		}
		else{
			this.key = data.key;
			this.type = data.type;
			this.message = data.message;
		}
		return this;
	}
	this.debug = function() {
		if(this.isError){
			let err = {}
			err.code = this.code;
			if(this.key) err.key = this.key;
			if(this.type) err.type = this.type;
			if(this.message) err.message = this.message;
			return err
		}
		else{
			return {data: this.data}
		}
	}
}