import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Handle incoming webhook: verify signature and process events
   * @param rawBody Buffer | null - raw request body (required for HMAC)
   * @param headers request headers map
   */
  async handleWebhook(rawBody: Buffer | null, headers: Record<string, any>) {
    try {
      const secret = process.env.GITHUB_WEBHOOK_SECRET ?? '';

      // Verify signature if secret available
      if (secret) {
        const sig256 = headers['x-hub-signature-256'] || headers['x-hub-signature'];
        if (!sig256) {
          this.logger.warn('Missing signature header');
          return { ok: false, reason: 'missing signature' };
        }

        if (!rawBody) {
          this.logger.warn('Raw body not available for signature verification');
          return { ok: false, reason: 'raw body missing' };
        }

        const computed = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
        if (!this.timingSafeEqual(computed, sig256)) {
          this.logger.warn('Invalid signature');
          return { ok: false, reason: 'invalid signature' };
        }
      } else {
        this.logger.warn('GITHUB_WEBHOOK_SECRET not set — skipping signature verification');
      }

      // Parse JSON payload from raw body when available
      let payload: any = null;
      if (rawBody) {
        try {
          payload = JSON.parse(rawBody.toString('utf8'));
        } catch (e) {
          this.logger.warn('Failed to parse raw JSON body, falling back to empty payload');
        }
      }

      const event = (headers['x-github-event'] || headers['X-GitHub-Event'])?.toString?.() ?? null;
      if (event === 'pull_request') {
        const action = payload?.action;
        const pr = payload?.pull_request;
        this.logger.log(`PR #${pr?.number}: ${pr?.title} [${action}]`);
        // Add any processing logic here (labeling, commenting, CI triggers, etc.)
        return { ok: true, processed: true };
      }

      this.logger.debug(`Unhandled event type: ${event}`);
      return { ok: true, processed: false };
    } catch (err) {
      this.logger.error('Error handling webhook', err as any);
      return { ok: false, reason: 'internal error' };
    }
  }

  private timingSafeEqual(a: string, b: string) {
    try {
      const bufA = Buffer.from(a);
      const bufB = Buffer.from(b);
      if (bufA.length !== bufB.length) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  }
}
