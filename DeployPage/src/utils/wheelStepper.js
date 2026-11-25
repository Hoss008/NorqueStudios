/**
 * Normalizes WheelEvent deltaY into approximate pixel units across delta modes.
 */
export function normalizeWheelDelta(event) {
  if (!event) return 0;
  if (event.deltaMode === 1) return event.deltaY * 24;
  if (event.deltaMode === 2) return event.deltaY * 100;
  return event.deltaY;
}

/**
 * Creates a gesture-aware wheel stepper that converts continuous touchpad
 * bursts and OS inertial/momentum streams into one discrete step (-1 or +1)
 * per intentional swipe, while keeping discrete mouse-wheel notches responsive.
 */
export function createGestureWheelStepper({
  threshold = 50,
  minCooldownMs = 400,
  settleMs = 140,
  spikeMultiplier = 2.2,
  minSpikeDelta = 40,
  reverseUnlockDelta = 18
} = {}) {
  let accumulated = 0;
  let isLocked = false;
  let lockedUntil = 0;
  let lockedDir = 0;
  let lastEventAt = 0;
  let prevAbsDelta = 0;
  let settleTimer = null;
  let idleResetTimer = null;

  const clearTimers = () => {
    if (settleTimer) {
      clearTimeout(settleTimer);
      settleTimer = null;
    }
    if (idleResetTimer) {
      clearTimeout(idleResetTimer);
      idleResetTimer = null;
    }
  };

  const scheduleSettleCheck = () => {
    if (settleTimer) clearTimeout(settleTimer);
    const now = performance.now();
    const waitForIdle = settleMs - (now - lastEventAt);
    const waitForCooldown = lockedUntil - now;
    const delay = Math.max(waitForIdle, waitForCooldown, 0);

    settleTimer = setTimeout(() => {
      const t = performance.now();
      const remainingIdle = settleMs - (t - lastEventAt);
      const remainingCooldown = lockedUntil - t;
      if (remainingIdle <= 2 && remainingCooldown <= 2) {
        isLocked = false;
        lockedDir = 0;
        accumulated = 0;
        prevAbsDelta = 0;
        settleTimer = null;
      } else {
        scheduleSettleCheck();
      }
    }, Math.max(delay, 16));
  };

  const lock = (cooldownMs = minCooldownMs, dir = 0) => {
    const now = performance.now();
    isLocked = true;
    lockedUntil = now + cooldownMs;
    lockedDir = dir;
    lastEventAt = now;
    accumulated = 0;
    if (idleResetTimer) {
      clearTimeout(idleResetTimer);
      idleResetTimer = null;
    }
    scheduleSettleCheck();
  };

  const reset = () => {
    clearTimers();
    accumulated = 0;
    isLocked = false;
    lockedUntil = 0;
    lockedDir = 0;
    lastEventAt = 0;
    prevAbsDelta = 0;
  };

  const consume = (rawDelta, stepThreshold = threshold) => {
    const absDelta = Math.abs(rawDelta);
    if (absDelta === 0) return 0;

    const now = performance.now();
    const dir = rawDelta > 0 ? 1 : -1;

    if (isLocked) {
      const pastCooldown = now >= lockedUntil;
      const isIntentionalSpike =
        pastCooldown &&
        prevAbsDelta > 0 &&
        absDelta >= minSpikeDelta &&
        absDelta > prevAbsDelta * spikeMultiplier;
      const isIntentionalReverse =
        pastCooldown &&
        lockedDir !== 0 &&
        dir !== lockedDir &&
        absDelta >= reverseUnlockDelta;

      if (isIntentionalSpike || isIntentionalReverse) {
        isLocked = false;
        lockedDir = 0;
        accumulated = 0;
        if (settleTimer) {
          clearTimeout(settleTimer);
          settleTimer = null;
        }
      } else {
        lastEventAt = now;
        prevAbsDelta = absDelta;
        scheduleSettleCheck();
        return 0;
      }
    }

    if (accumulated !== 0 && (accumulated > 0 ? 1 : -1) !== dir) {
      accumulated = 0;
    }

    accumulated += rawDelta;
    lastEventAt = now;
    prevAbsDelta = absDelta;

    if (idleResetTimer) clearTimeout(idleResetTimer);
    idleResetTimer = setTimeout(() => {
      accumulated = 0;
      prevAbsDelta = 0;
      idleResetTimer = null;
    }, settleMs);

    if (Math.abs(accumulated) >= stepThreshold) {
      const step = accumulated > 0 ? 1 : -1;
      lock(minCooldownMs, step);
      return step;
    }

    return 0;
  };

  return {
    consume,
    lock,
    reset,
    destroy: reset,
    isLocked: () => isLocked
  };
}
