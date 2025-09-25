import { DetectionService } from './detectionService';

describe('DetectionService', () => {
  it('should be defined', () => {
    expect(new DetectionService()).toBeDefined();
  });

  it('should have a run method', async () => {
    const detectionService = new DetectionService();
    expect(detectionService.run).toBeDefined();
    // A simple test for the initial implementation
    const result = await detectionService.run('/fake/path');
    expect(result).toEqual({});
  });
});
