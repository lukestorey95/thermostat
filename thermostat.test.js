const Thermostat = require("./thermostat");

describe("Thermostat", () => {
  describe("getTemperatures", () => {
    it("should return the default temperature of 20", () => {
      const thermostat = new Thermostat();

      expect(thermostat.getTemperature()).toBe(20);
    });
  });

  describe("up", () => {
    it("should increase the temperature by 1", () => {
      const thermostat = new Thermostat();

      thermostat.up();

      expect(thermostat.getTemperature()).toBe(21);
    });

    it("when power saving mode is enabled should not increase temperature above 25", () => {
      const thermostat = new Thermostat();

      for (i = 0; i <= 20; i++) {
        thermostat.up();
      }
      expect(thermostat.getTemperature()).toBe(25);
    });

    it("when power saving mode is disabled should not increase temperature above 32", () => {
      const thermostat = new Thermostat();

      thermostat.setPowerSavingMode(false);

      for (i = 0; i <= 20; i++) {
        thermostat.up();
      }
      expect(thermostat.getTemperature()).toBe(32);
    });
  });

  describe("down", () => {
    it("should decrease the temperature by 1", () => {
      const thermostat = new Thermostat();

      thermostat.down();

      expect(thermostat.getTemperature()).toBe(19);
    });

    it("should not decrease the temperature below 10", () => {
      const thermostat = new Thermostat();

      for (i = 0; i <= 20; i++) {
        thermostat.down();
      }
      expect(thermostat.getTemperature()).toBe(10);
    });
  });

  describe("setPowerSavingMode", () => {
    it("should default to true", () => {
      const thermostat = new Thermostat();
      expect(thermostat.powerSavingMode).toBe(true);
    });

    it("when passed false should change to false", () => {
      const thermostat = new Thermostat();
      thermostat.setPowerSavingMode(false);

      expect(thermostat.powerSavingMode).toBe(false);
    });

    it("when passed true should change to true", () => {
      const thermostat = new Thermostat();
      thermostat.setPowerSavingMode(false);
      thermostat.setPowerSavingMode(true);

      expect(thermostat.powerSavingMode).toBe(true);
    });
  });

  describe("reset", () => {
    it("should reset the temperature back to 20", () => {
      const thermostat = new Thermostat();
      thermostat.up();
      thermostat.reset();

      expect(thermostat.temperature).toBe(20);
    });
  });

  describe("currentEnergyUsage", () => {
    it("should return low when temperature is less than 18", () => {
      const thermostat = new Thermostat();

      for (i = 0; i <= 20; i++) {
        thermostat.down();
      }

      expect(thermostat.currentEnergyUsage()).toBe("low");
    });

    it("should return medium when temperature is 18 to 25", () => {
      const thermostat = new Thermostat();

      expect(thermostat.currentEnergyUsage()).toBe("medium");
    });

    it("should return high when temperature is above 25", () => {
      const thermostat = new Thermostat();

      thermostat.setPowerSavingMode(false);

      for (i = 0; i <= 20; i++) {
        thermostat.up();
      }

      expect(thermostat.currentEnergyUsage()).toBe("high");
    });
  });
});
