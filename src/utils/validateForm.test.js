import validateForm from './validateForm';

describe('validateForm', () => {
  const rules = {
    username: { required: true, minLength: 3 },
    password: { required: true, minLength: 6 },
    re_password: { required: true, match: 'password' },
  };

  it('powinno zwrócić stan jako poprawny, gdy wszystkie pola są prawidłowe', () => {
    const state = {
      username: 'user123',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('powinno zwrócić błąd, gdy wymagane pole jest puste', () => {
    const state = {
      username: '',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('username is required');
  });

  it('powinno zwrócić błąd, gdy pole nie spełnia minimalnej długości', () => {
    const state = {
      username: 'us',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors.username).toBe('username must be at least 3 characters long');
  });

  it('powinno zwrócić błąd, gdy hasła się nie zgadzają', () => {
    const state = {
      username: 'user123',
      password: 'password123',
      re_password: 'wrongpassword',
      isTouched: { username: true, password: true, re_password: true },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors.re_password).toBe('Passwords do not match');
  });

  it('powinno być niepoprawne, gdy pola nie zostały dotknięte', () => {
    const state = {
      username: 'user123',
      password: 'password123',
      re_password: 'password123',
      isTouched: { username: false, password: false, re_password: false },
    };

    const result = validateForm(state, rules);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual({});
  });
});