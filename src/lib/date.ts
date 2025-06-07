import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const humanize = (...rest: [number, string?] | [object]) => {
	// @ts-ignore
	return dayjs.duration(...rest).humanize();
};

const formatDate = (date: Date = new Date(), template = "") => {
	return dayjs(date).format(template);
};

export { formatDate, humanize };
