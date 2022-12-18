import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";

const dates = [new Date(2000, 0, 0), new Date(2000, 0, 1)];

class CalendarItemTestChildController extends CalendarItemChildController {
  protected getCalendarItemChildDates(
    childId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return Promise.resolve([...dates]);
  }
}

describe("Tags Model", () => {
  let testChildController: CalendarItemTestChildController;

  beforeEach(() => {
    testChildController = new CalendarItemTestChildController();
    jest.useFakeTimers().setSystemTime(new Date(2000, 0, 0));
  });

  it("Should return the earliest date on getLastDate call", async () => {
    expect(await testChildController.getLastDate(1)).toEqual(dates[1]);
  });

  it("Should call getDates with start and end of month on getDatesInCurrentMonth call", async () => {
    testChildController.getDates = jest.fn();
    testChildController.getDatesInCurrentMonth(1);
    expect(testChildController.getDates).toHaveBeenCalledWith(
      1,
      startOfMonth(new Date(2000, 0, 0)),
      endOfMonth(new Date(2000, 0, 0))
    );
  });

  it("Should call getDates with start and end of year on getDatesInCurrentYear call", async () => {
    testChildController.getDates = jest.fn();
    testChildController.getDatesInCurrentYear(1);
    expect(testChildController.getDates).toHaveBeenCalledWith(
      1,
      startOfYear(new Date(2000, 0, 0)),
      endOfYear(new Date(2000, 0, 0))
    );
  });
});
