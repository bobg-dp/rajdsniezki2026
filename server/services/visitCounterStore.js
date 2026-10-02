import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_STATE = {
  totalVisits: 0,
  updatedAt: null,
};

export class VisitCounterStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.state = { ...DEFAULT_STATE };
    this.writeQueue = Promise.resolve();
    this.ready = this.load();
  }

  async load() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      const fileContent = await fs.readFile(this.filePath, "utf8");
      const normalizedContent = fileContent.trim();

      if (!normalizedContent) {
        await this.resetInvalidStateFile(
          "Visit counter file is empty. Resetting to default state.",
        );
        return;
      }

      let parsedState;

      try {
        parsedState = JSON.parse(normalizedContent);
      } catch (error) {
        if (error instanceof SyntaxError) {
          await this.resetInvalidStateFile(
            "Visit counter file is not valid JSON. Resetting to default state.",
          );
          return;
        }

        throw error;
      }

      this.state = normalizeState(parsedState);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }

      await this.persist();
    }
  }

  async getSnapshot() {
    await this.ready;
    return { ...this.state };
  }

  async increment(metadata = {}) {
    await this.ready;

    this.writeQueue = this.writeQueue.then(async () => {
      this.state = {
        totalVisits: this.state.totalVisits + 1,
        updatedAt: new Date().toISOString(),
        lastVisit: {
          path: metadata.path,
          userAgent: metadata.userAgent,
        },
      };

      await this.persist();

      return { ...this.state };
    });

    return this.writeQueue;
  }

  async persist() {
    const temporaryFilePath = `${this.filePath}.tmp`;

    await fs.writeFile(
      temporaryFilePath,
      `${JSON.stringify(this.state, null, 2)}\n`,
      "utf8",
    );

    await fs.rename(temporaryFilePath, this.filePath);
  }

  async resetInvalidStateFile(message) {
    console.warn(message);
    this.state = { ...DEFAULT_STATE };
    await this.persist();
  }
}

function normalizeState(parsedState) {
  if (
    !parsedState ||
    typeof parsedState !== "object" ||
    Array.isArray(parsedState)
  ) {
    return { ...DEFAULT_STATE };
  }

  const totalVisits = Number(parsedState.totalVisits ?? 0);

  return {
    totalVisits: Number.isFinite(totalVisits) ? totalVisits : 0,
    updatedAt: parsedState.updatedAt ?? null,
  };
}
