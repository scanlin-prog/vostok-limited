import { defineStore } from 'pinia';
import type { SelectItem } from '@/shared/ui/form';

interface IFormData {
  city: string;
  workshop: string;
  worker: string;
  brigade: string;
  shift: string;
}

interface IAppState {
  cities: SelectItem[];
  workshops: SelectItem[];
  workers: SelectItem[];
  brigades: SelectItem[];
  shifts: SelectItem[];
  formData: IFormData;
}

interface IData {
  [x: string]: SelectItem[];
}

const namespace = 'app';

export const useAppStore = defineStore(namespace, {
  state: (): IAppState => ({
    cities: [
      {
        id: 'city-1',
        value: 'Липецк',
        title: 'Липецк',
      },
      {
        id: 'city-2',
        value: 'Самара',
        title: 'Самара',
      },
      {
        id: 'city-3',
        value: 'Москва',
        title: 'Москва',
      },
      {
        id: 'city-4',
        value: 'Белгород',
        title: 'Белгород',
      },
    ],
    workshops: [
      {
        id: 'workshop-1',
        value: 'Сборочный',
        title: 'Сборочный',
        cityId: 'city-2',
      },
      {
        id: 'workshop-2',
        value: 'Текстильный',
        title: 'Текстильный',
        cityId: 'city-2',
      },
      {
        id: 'workshop-3',
        value: 'Электронный',
        title: 'Электронный',
        cityId: 'city-1',
      },
      {
        id: 'workshop-4',
        value: 'Химический',
        title: 'Химический',
        cityId: 'city-3',
      },
      {
        id: 'workshop-5',
        value: 'Пищевой',
        title: 'Пищевой',
        cityId: 'city-4',
      },
    ],
    workers: [
      {
        id: 'worker-1',
        value: 'Василий',
        title: 'Василий',
        workshopId: 'workshop-3',
      },
      {
        id: 'worker-2',
        value: 'Николай',
        title: 'Николай',
        workshopId: 'workshop-3',
      },
      {
        id: 'worker-3',
        value: 'Иван',
        title: 'Иван',
        workshopId: 'workshop-1',
      },
      {
        id: 'worker-4',
        value: 'Александр',
        title: 'Александр',
        workshopId: 'workshop-2',
      },
      {
        id: 'worker-5',
        value: 'Петр',
        title: 'Петр',
        workshopId: 'workshop-2',
      },
      {
        id: 'worker-6',
        value: 'Андрей',
        title: 'Андрей',
        workshopId: 'workshop-4',
      },
      {
        id: 'worker-7',
        value: 'Владимир',
        title: 'Владимир',
        workshopId: 'workshop-5',
      },
    ],
    brigades: [
      {
        id: 'brigade-1',
        value: 'первая бригада',
        title: 'первая бригада',
      },
      {
        id: 'brigade-2',
        value: 'вторая бригада',
        title: 'вторая бригада',
      },
      {
        id: 'brigade-3',
        value: 'третья бригада',
        title: 'третья бригада',
      },
      {
        id: 'brigade-4',
        value: 'четвертая бригада',
        title: 'четвертая бригада',
      },
      {
        id: 'brigade-5',
        value: 'пятая бригада',
        title: 'пятая бригада',
      },
    ],
    shifts: [
      {
        id: 'shift-1',
        value: 'смена 1',
        title: 'смена 1',
      },
      {
        id: 'shift-2',
        value: 'смена 2',
        title: 'смена 2',
      },
      {
        id: 'shift-3',
        value: 'смена 3',
        title: 'смена 3',
      },
    ],
    formData: {
      city: '',
      workshop: '',
      worker: '',
      brigade: '',
      shift: '',
    },
  }),
  actions: {
    getData(): IData {
      const cities = this.cities;
      const brigades = this.brigades;
      const shifts = this.shifts;

      return {
        cities,
        brigades,
        shifts,
      };
    },
    uploadData(data: IFormData) {
      this.formData.city = data.city;
      this.formData.workshop = data.workshop;
      this.formData.worker = data.worker;
      this.formData.brigade = data.brigade;
      this.formData.shift = data.shift;
    },
    getWorkshops(cityName: string): SelectItem[] {
      const cityId = this.cities.find((item) => item.value === cityName)?.id;
      const selectedWorkshops = this.workshops
        .filter((workshop) => workshop.cityId === cityId)
        .map((workshop) => {
          return workshop;
        });

      return selectedWorkshops;
    },
    getWorkers(workshopName: string): SelectItem[] {
      const workshopId = this.workshops.find(
        (item) => item.value === workshopName,
      )?.id;
      const selectedWorkers = this.workers
        .filter((worker) => worker.workshopId === workshopId)
        .map((worker) => {
          return worker;
        });

      return selectedWorkers;
    },
  },
});
