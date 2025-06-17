
interface FilePart {
    PartNumber: number;
    ETag: string;
    signedUrl: string;
}

export interface ProcessArgs {
    sent: number;
    total: number;
    uuid: string;
    percentage: number;
    key?: string;
}
interface UploaderOptions {
    file: File;
    chunkSize?: number;
    threadsQuantity?: number;
    uuid: string;
}

export class Uploader {
    chunkSize: number;
    threadsQuantity: number;
    file: File | null;
    uuid: string;
    uploadedSize: number;
    progressCache: any;
    activeConnections: any;
    counter: number;
    aborted: boolean;
    parts: FilePart[];
    uploadedParts: FilePart[];
    fileId: string|undefined;
    fileKey: string|undefined;
    onProgressFn: (args: ProcessArgs) => void;
    onErrorFn: (error?: Error) => void;
    onCompleteFn: () => void;

   constructor(options: UploaderOptions) {
		// this must be bigger than or equal to 0.1mb
		// otherwise AWS will respond with "Your proposed upload is smaller than the minimum allowed size"
		this.chunkSize = options.chunkSize || 1024 * 1024 * 5;
		// this is # of parallel uploads
		this.threadsQuantity = Math.min(options.threadsQuantity || 10, 50);
		this.file = options.file;
		this.uuid = options.uuid;
		this.aborted = false;
		this.uploadedSize = 0;
		this.progressCache = {};
		this.activeConnections = {};
		this.counter = 0;
		this.parts = [];
		this.uploadedParts = [];
		this.fileId = undefined;
		this.fileKey = undefined;
		this.onProgressFn = () => {};
		this.onErrorFn = () => {};
		this.onCompleteFn = () => {};
	}

    start() {
        this.initUpload()
    }
    async initUpload() {
        try {
            const ext = this.file?.name.split(".").pop();
			const name = this.file?.name.split(".").shift();
			let fileName = "";

			if (ext) {
				fileName += `${name?.replace(/\s+/g, "-")}.${ext}`;
			} else fileName += name;
        } catch (error) {
            
        }
    }
}