#include <iostream>
#include <string>

struct End { };

template<const char s[], int n = 0, const char cond = s[n]>
struct CharList
{
  constexpr static const char Value() { return s[n]; }
  typedef CharList<s, n + 1> Next;
};

template<const char s[], int n>
struct CharList<s, n, 0>
{
  constexpr static const char Value() { return 0; }
  typedef End Next;
};

// ugly print
template <typename T>
struct CharListToString
{
  static std::string String() { return T::Value() + CharListToString<typename T::Next>::String(); }
};

template <>
struct CharListToString<End>
{
  static std::string String()
  {
    return "";
  }
};
// end: ugly print

// strcpy USELESS just for fun
template <class A>
struct CopyCharList;

template <const char s[], int n, const char cond>
struct CopyCharList<CharList<s, n, cond> >
{
  constexpr static const char Value() { return s[n]; }
  typedef CopyCharList<CharList<s, n + 1> > Next;
};

template <const char s0[], int n0>
struct CopyCharList<CharList<s0, n0, 0> >
{
  constexpr static const char Value() { return 0; }
  typedef End Next;
};
// end : strcpy


// strcat
template <class A, class B>
struct AppendCharList;

template <const char s0[], int n0, const char cond0, class B>
struct AppendCharList<CharList<s0, n0, cond0>, B>
{
  constexpr static const char Value() { return s0[n0]; }
  typedef AppendCharList<CharList<s0, n0 + 1, s0[n0 + 1]>, B> Next;
};

template <const char s0[], const char s1[], int n0, int n1, const char cond1>
struct AppendCharList<CharList<s0, n0, 0>, CharList<s1, n1, cond1> >
{
  constexpr static const char Value() { return s1[n1]; }
  typedef AppendCharList<CharList<s0, n0, 0>, CharList<s1, n1 + 1, s1[n1 +1]> > Next;
};

template <const char s0[], const char s1[], int n0, int n1>
struct AppendCharList<CharList<s0, n0, 0>, CharList<s1, n1, 0> >
{
  constexpr static const char Value() { return 0; }
  typedef End Next;
};
// end: strcat

// strlen
template <class A>
struct SizeOfCharList;

template <template <const char s[], int n, const char> class List, const char s[], int n, const char cond>
struct SizeOfCharList<List<s, n, cond> >
{
  constexpr static const std::size_t Value() { return 1 + SizeOfCharList<List<s, n + 1, s[n + 1]> >::Value();}
  typedef SizeOfCharList<CharList<s, n + 1> > Next;
};

template <template <const char s[], int n, const char> class List, const char s0[], int n0>
struct SizeOfCharList<List<s0, n0, 0> >
{
  constexpr static const std::size_t Value() { return 0; }
};
// end: strlen


extern constexpr char a[] = "Test";
extern constexpr char b[] = "ing together.";

int main()
{
  typedef CharList<a> str0;
  typedef CharList<b> str1;
  typedef AppendCharList<str0, str1> str3;

  std::cout << CharListToString<str0>::String() << std::endl;
  std::cout << CharListToString<CopyCharList<str0>>::String() << std::endl;
  std::cout << CharListToString<str3>::String() << std::endl;
  std::cout << SizeOfCharList<str1>::Value() << std::endl;
}
